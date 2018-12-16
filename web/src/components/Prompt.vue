<template>
  <div v-show="promptVisible" id="prompt-div">
    <textarea v-if="textareaVisible" v-model="info" class="textarea-mod prompt-style" id="prompt-textarea" readonly="readonly"></textarea>
    <input class="input-mod prompt-style" id="prompt-caret" value=">" maxlength="1" readonly="readonly">
    <input v-model="command" ref="prompt" class="input-mod prompt-style" id="prompt" maxlength="75">
    <button class="prompt-style" id="prompt-textarea-btn" @click="toggleTextarea" v-html="arrows[arrowDirection]"></button>
  </div>
</template>

<script>
export default {
  name: "Prompt",
  data() {
    return {
      promptVisible: false,
      textareaVisible: false,
      arrows: {
        "up": "&#9650;",
        "down": "&#9660;"
      },
      arrowDirection: "up",
      command: "",
      info: ""
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if(e.code === "Backquote") {
        e.preventDefault() // Prevents adding ` when opening the prompt
        this.showPrompt()
      }
      else if(e.code === "Escape") {
        this.hidePrompt()
      }
      else if(e.code === "Enter") {
        if(this.promptVisible) {
          this.run()
        }
      }
    })
  },
  methods: {
    togglePrompt() {
      if(this.promptVisible) {
        this.hidePrompt()
      }
      else {
        this.showPrompt()
      }
    },
    showPrompt() {
      this.promptVisible = true
      this.focusPrompt()
    },
    hidePrompt() {
      this.promptVisible = false
      this.hideTextarea()
      this.clearCommand()
    },
    focusPrompt() {
      this.$nextTick(() => {
        if(this.$refs.prompt) {
          this.$refs.prompt.focus()
        }
      })
    },
    toggleTextarea() {
      if(this.textareaVisible) {
        this.hideTextarea()
      }
      else {
        this.showTextarea()
      }
    },
    showTextarea() {
      this.textareaVisible = true
      this.arrowDirection = "down"
    },
    hideTextarea() {
      this.textareaVisible = false
      this.arrowDirection = "up"
      this.clearTextarea()
    },
    clearCommand() {
      this.command = ""
    },
    clearTextarea() {
      this.info = ""
    },
    run() {
      const parts = this.command.toLowerCase().split(" ").filter(p => {
        if(p === "") {
          return false
        }
        return true
      }).map(p => p.trim())
      const cmd = parts[0].trim()
      const args = parts.slice(1)

      if(cmd === "echo") {
        this.echo(args)
      }
      else if(cmd === "cd") {
        this.cd(args)
      }
      else if(cmd === "login") {
        this.cd(["login"])
      }
      else if(cmd === "toggle") {
        this.toggle()
      }
      else if(cmd === "exit") {
        this.exit()
      }
      else if(cmd === "help") {
        this.help()
      }

      this.clearCommand()
    },
    echo(args) {
      alert(args.join(" "))
    },
    cd(args) {
      let path = args[0]
      if(args.length < 1) {
        path = ""
      }

      this.$router.push({path: "/" + path})
    },
    toggle() {
      this.toggleTextarea()
    },
    exit() {
      this.hidePrompt()
    },
    help() {
      this.clearTextarea()
      this.info = `usage: command [arg1] [arg2] ...
Available commands:
  echo - prints args to alert() box
  cd - navigates to the given arg
  login - alias for \`cd login\`
  toggle - toggles the info box
  exit - closes the command prompt
  help - prints this message
`
      this.showTextarea()
    },
  }
}
</script>

<style scoped>
.prompt-style {
  height: 25px;
  background-color: rgba(0,0,0,0.85);
  color: #00CC00;
  font-family: "Courier New", Courier, monospace;
  border: 0;
  font-weight: bold;
}

#prompt-div {
  bottom: 30px;
  margin-left: 310px;
  position: fixed;
}

#prompt-caret {
  width: 10px;
  font-weight: bold;
  padding-left: 1px;
  padding-right: 1px;
}
#prompt-caret:focus {
  outline: none;
}

#prompt {
  width: 500px;
  padding-left: 1px;
  padding-right: 1px;
}
#prompt:focus {
  outline: none;
}
#prompt::-ms-clear {
  width: 0px;
  height: 0px;
}

#prompt-textarea {
  width: 531px;
  padding: 2px;
  border: 0;
  resize: none;
  position: absolute;
  bottom: 30px;
  font-size: 12px;
  height: 150px;
}
#prompt-textarea:focus {
  outline: none;
}

#prompt-textarea-btn {
  border: 0;
  width: 21px;
  height: 27px;
  cursor: pointer;
}
#prompt-textarea-btn:focus {
  outline: none;
}

@media screen and (max-width: 969px) {
  #prompt-div {
    display: none;
  }
}
</style>
