import WordSwitcher from "../WordSwitcher";

export default function App() {
  return (
    <WordSwitcher 
      words={['WordSwitcher', 'TryToChangeThisStringArray', 'ReactJS']} 
      velocity={5}        // default: 7
      transitionDelay={1} // default: 2
      mode="inc"          // default: 'dec'
    />
  );
}
