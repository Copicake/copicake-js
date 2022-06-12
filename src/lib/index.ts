import Image from "./image";

interface IProps {
  apiKey: string;
}

class Copicake {
  private apiKey: string;

  public image: Image;

  constructor({ apiKey }: IProps) {
    this.apiKey = apiKey;
    this.image = new Image(this.apiKey);
  }
}

export default Copicake;
