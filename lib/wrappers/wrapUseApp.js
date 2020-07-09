import { loadTracker } from "../tracker";
export default function loadOnUseApp(origUseApp) {
  return function useApp(props) {
    loadTracker(window);
    return origUseApp(props);
  };
}
