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
      info: "",
      history: [],
      historyIndex: -1
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
      else if(e.code === "ArrowUp") {
        if(this.promptVisible) {
          this.prev()
        }
      }
      else if(e.code === "ArrowDown") {
        if(this.promptVisible) {
          this.next()
        }
      }
    })
  },
  methods: {
    // TODO:
    //   - Handle textarea overflow.
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
      this.historyIndex = -1
      this.hideTextarea()
      this.clearCommand()
    },
    focusPrompt() {
      this.$nextTick(() => {
        this.$refs.prompt.focus()
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
    setCommand(cmd) {
      this.command = cmd
      // Force the model to update even if the adjacent command is the same
      // as the current command.
      this.$forceUpdate()
    },
    clearTextarea() {
      this.info = ""
    },
    moveCursorToEnd() {
      const pos = this.command.length

      // NOTE: this.$nextTick doesn't work here...
      setTimeout(() => {
        this.$refs.prompt.selectionStart = pos
        this.$refs.prompt.selectionEnd = pos
      }, 10)
    },
    prev() {
      if(this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        this.setCommand(this.history[this.historyIndex])
      }

      this.moveCursorToEnd()
    },
    next() {
      if(this.historyIndex >= 0) {
        this.historyIndex--
        if(this.historyIndex < 0) {
          this.setCommand("")
        }
        else {
          this.setCommand(this.history[this.historyIndex])
        }
      }
    },
    run() {
      this.history.unshift(this.command) // Push to top of history stack

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

      this.historyIndex = -1
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
