import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';
import './css/prompt.css';
import { THEMES } from '../utils/constants';

const Prompt = ({ themeProps }) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [outputWindowVisible, setOutputWindowVisible] = useState(false);
  const [arrowDirection, setArrowDirection] = useState('up');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState('');
  const [command, setCommand] = useState('');

  const outputWindowRef = useRef(null);
  const promptRef = useRef(null);

  const routerHistory = useHistory();
  const location = useLocation();

  const ARROWS = {
    up: '&#9650;',
    down: '&#9660;',
  };

  const ECHO_LEVELS = useMemo(
    () => [
      toast.TYPE.INFO,
      toast.TYPE.SUCCESS,
      toast.TYPE.WARNING,
      toast.TYPE.ERROR,
      toast.TYPE.DEFAULT,
      toast.TYPE.DARK,
    ],
    [],
  );

  const scrollOutputWindowToBottom = useCallback(() => {
    if (outputWindowRef.current) {
      outputWindowRef.current.scrollTop = outputWindowRef.current.scrollHeight;
    }
  }, []);

  const showOutputWindow = useCallback(
    (scrollToTop = true) => {
      setOutputWindowVisible(true);
      setArrowDirection('down');
      if (scrollToTop) {
        setTimeout(() => scrollOutputWindowToBottom(), 0);
      }
    },
    [scrollOutputWindowToBottom],
  );

  const hideOutputWindow = () => {
    setOutputWindowVisible(false);
    setArrowDirection('up');
  };

  const showPrompt = () => {
    setPromptVisible(true);
  };

  const hidePrompt = useCallback(() => {
    setPromptVisible(false);
    setHistoryIndex(-1);
    hideOutputWindow();
    clearCommand();
  }, []);

  const toggleOutputWindow = useCallback(() => {
    outputWindowVisible ? hideOutputWindow() : showOutputWindow();
  }, [outputWindowVisible, showOutputWindow]);

  const setTheme = useCallback(
    (which) => {
      themeProps.applyTheme(which);
    },
    [themeProps],
  );

  const clearCommand = () => {
    setCommand('');
  };

  const clearOutput = () => {
    setOutput('');
  };

  const moveCursorToEnd = () => {
    promptRef.current.selectionStart = promptRef.current.value.length;
    promptRef.current.selectionEnd = promptRef.current.value.length;
  };

  useEffect(() => {
    if (history[historyIndex] === undefined) {
      clearCommand();
    } else {
      setCommand(history[historyIndex]);
    }
  }, [history, historyIndex]);

  const prev = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((currentHistoryIndex) => currentHistoryIndex + 1);
    }
    moveCursorToEnd();
  }, [history.length, historyIndex]);

  const next = useCallback(() => {
    if (historyIndex >= 0) {
      setHistoryIndex((currentHistoryIndex) => currentHistoryIndex - 1);
    }
    moveCursorToEnd();
  }, [historyIndex]);

  const echo = useCallback(
    (args) => {
      let level = toast.TYPE.INFO;
      if (args[0].startsWith('--')) {
        const proposed = args.shift().substring(2);
        if (ECHO_LEVELS.includes(proposed)) {
          level = proposed;
        }
      }

      toast(args.join(' '), { type: level });
    },
    [ECHO_LEVELS],
  );

  const cd = useCallback(
    (args) => {
      let path = args[0];
      if (args.length < 1) {
        path = '';
      }
      if (path.startsWith('/')) {
        path = path.substring(1);
      }
      if (path.endsWith('/')) {
        path = path.slice(0, -1);
      }

      path = `/${path}`;

      if (location.pathname === path) {
        return;
      }

      routerHistory.push(path);
    },
    [location.pathname, routerHistory],
  );

  const exit = useCallback(() => {
    hidePrompt();
  }, [hidePrompt]);

  const help = useCallback(() => {
    clearOutput();

    const levels = ECHO_LEVELS.reduce((acc, cur) => `${acc}, ${cur}`);
    const themes = Object.values(THEMES).reduce((acc, cur) => `${acc}, ${cur}`);

    setOutput(`usage: command [arg1] [arg2] ...
  Available commands:
  echo   - prints args to toast notification of optional type
           (options: ${levels})
           ex: echo --${ECHO_LEVELS[0]} Hello World
  cd     - navigates to the given arg
  toggle - toggles the output window
  theme  - sets the theme to the arg (options: ${themes})
           ex: theme ${Object.values(THEMES)[0]}
  exit   - closes the command prompt
  help   - prints this message
  `);
    if (!outputWindowVisible) {
      showOutputWindow(false);
    }
  }, [ECHO_LEVELS, outputWindowVisible, showOutputWindow]);

  const run = useCallback(
    ({ cmd = null, event = null, recordHistory = true }) => {
      if (cmd === '') return;

      if (recordHistory) {
        // Push to top of history stack
        setHistory((prevHistory) => [cmd, ...prevHistory]);
      }

      const parts = cmd
        .split(' ')
        .filter((p) => {
          return p !== '';
        })
        .map((p) => p.trim());
      const cleanedCommand = parts[0].trim().toLowerCase();
      const args = parts.slice(1);

      switch (cleanedCommand) {
        case 'echo':
          echo(args);
          break;
        case 'cd':
          cd(args);
          break;
        case 'toggle':
          toggleOutputWindow();
          break;
        case 'theme':
          setTheme(args[0]);
          break;
        case 'exit':
          exit();
          break;
        case 'help':
          help();
          break;
        default:
          break;
      }

      setHistoryIndex(-1);
      clearCommand();
    },
    [cd, echo, exit, help, setTheme, toggleOutputWindow],
  );

  useEffect(() => {
    const gutter = history.length.toString().length + 1;
    const historyString = history
      .slice()
      .reverse()
      .reduce(
        (accumulator, item, i) =>
          (accumulator += `${(i + 1)
            .toString()
            .padStart(gutter, ' ')} ${item} \n`),
        '',
      );

    setOutput(historyString);

    setTimeout(() => scrollOutputWindowToBottom(), 0);
  }, [history, scrollOutputWindowToBottom]);

  useEffect(() => {
    const keyupFn = (e) => {
      if (e.code === 'Backquote') {
        e.preventDefault(); // Prevents adding ` when opening the prompt
        showPrompt();
      } else if (e.code === 'Escape') {
        hidePrompt();
      } else if (e.code === 'Enter') {
        if (promptVisible) {
          run({ cmd: command, event: e });
        }
      } else if (e.code === 'ArrowUp') {
        if (promptVisible) {
          prev();
        }
      } else if (e.code === 'ArrowDown') {
        if (promptVisible) {
          next();
        }
      }
    };

    window.addEventListener('keyup', keyupFn);

    return () => window.removeEventListener('keyup', keyupFn);
  }, [command, hidePrompt, next, prev, promptVisible, run]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.info(
      `%c[${window.location.host}] Prefer a CLI? Press the tilde (~) key and type \`help\` for usage.`,
      'font-size: 16px; background-color: rgba(0,0,0,0.85); color: #00CC00; font-family: "Courier New", Courier, monospace;',
    );
  }, []);

  return (
    <>
      {promptVisible && (
        <div id="prompt-wrapper">
          {outputWindowVisible && (
            <textarea
              value={output}
              className="prompt-style"
              id="prompt-output-window"
              ref={outputWindowRef}
              readOnly="readonly"
            ></textarea>
          )}
          <input
            className="prompt-style"
            id="prompt-caret"
            value=">"
            maxLength="1"
            readOnly="readonly"
          />
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="prompt-style"
            id="prompt"
            ref={promptRef}
            maxLength="75"
            autoComplete="off"
            autoFocus
          />
          <button
            className="prompt-style"
            id="prompt-output-window-btn"
            onClick={() => run({ cmd: 'toggle', recordHistory: false })}
            dangerouslySetInnerHTML={{ __html: ARROWS[arrowDirection] }}
          ></button>
        </div>
      )}
    </>
  );
};

export default Prompt;
