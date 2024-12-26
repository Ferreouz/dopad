import { ImageCardProps } from "./types";
import '../common/css/card.css';
import CopyButton from "../CopyButton";
import DeleteButton from "../DeleteButton";

const ImageCard = (props: ImageCardProps) => {

  return (
    <div className="card">

      <DeleteButton class="card__close" onDelete={() => props.onDelete()} />

      <img className="card__img" id="image"
        src={props.url}
        alt="" />

      <CopyButton content={props.url} type="image" class="card__action"></CopyButton>
    </div>
  );
};

export default ImageCard;