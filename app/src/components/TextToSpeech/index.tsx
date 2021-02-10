import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

interface Props {
  key?: string;
  utterText: string;
  handleOnFinishSpeaking: () => void;
}

const TextToSpeech = ({ utterText, handleOnFinishSpeaking }: Props) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;
  const voice = synth.getVoices()[1];
  //   const msg = new SpeechSynthesisUtterance();
  const msg = useMemo(() => new SpeechSynthesisUtterance(utterText), [
    utterText,
  ]);
  //   msg.text = utterText;

  msg.voice = voice;
  msg.volume = 1;
  msg.rate = 0.8;

  msg.onstart = (ev: SpeechSynthesisEvent) => {
    setIsSpeaking(true);
  };
  msg.onend = (ev: SpeechSynthesisEvent) => {
    setIsSpeaking(false);
    handleOnFinishSpeaking();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) synth.speak(msg);
    return () => {
      mounted = false;
      synth.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePauseUtterance = () => {
    synth.pause();
    setIsSpeaking(false);
  };
  const handlePlayUtterance = () => {
    synth.resume();
    setIsSpeaking(true);
  };
  return (
    <Tooltip label={`${isSpeaking ? "Pause" : "Play"} read aloud`}>
      <IconButton
        aria-label="Toggle Read aloud"
        onClick={isSpeaking ? handlePauseUtterance : handlePlayUtterance}
        icon={isSpeaking ? <Icon as={MdPause} /> : <Icon as={MdPlayArrow} />}
      />
    </Tooltip>
  );
};

export default TextToSpeech;
