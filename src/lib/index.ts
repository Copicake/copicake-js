import Image from "./image";
import Utils from "./utils";

interface IProps {
  apiKey: string;
}

class Copicake {
  private apiKey: string;

  public image: Image;

  public utils: Utils;

  constructor({ apiKey }: IProps) {
    this.apiKey = apiKey;
    this.image = new Image(this.apiKey);
    this.utils = new Utils(this.apiKey);
  }
}

export default Copicake;
