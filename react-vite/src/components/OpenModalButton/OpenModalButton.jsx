import { useModal } from '../../context/Modal';
import MenuSVG from '../MenuSVG/MenuSVG';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  buttonID
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  if (buttonID.startsWith('nav')) {
    return (
      <MenuSVG
        text={buttonText}
        onClick={onClick}
      />
    )
  }
  return (
    <button
      id={buttonID}
      onClick={onClick}>
        {buttonText}
    </button>
  )
}

export default OpenModalButton;
