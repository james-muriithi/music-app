const ACTION_KEYS = ["ARROWLEFT", "ARROWRIGHT", "SPACE"]

export default function keyboardEvents(handlers) {
  const handler = e => {
    const upperCaseKey = e.code.toUpperCase()

    if (ACTION_KEYS.indexOf(upperCaseKey) === -1) {
      return
    }

    const {
      // playNext,
      // playPrevious,
      togglePlaying,
    } = handlers

    switch (upperCaseKey) {
      // case 'ARROWLEFT':
      //   playPrevious();
      //   break;
      // case 'ARROWRIGHT':
      //   playNext();
      //   break;
      case "SPACE":
        togglePlaying()
        break
      default:
        break
    }
  }
  const globalWindow = typeof window !== "undefined" && window
  globalWindow.addEventListener("keydown", handler)
  return () => globalWindow.removeEventListener("keydown", handler)
}
