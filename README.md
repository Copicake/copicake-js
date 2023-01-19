# Copicake JS

🍰 Copicake, a data-driven image generating service to let you generate any social media material with just ONE CLICK.

- 🔗 Website: https://copicake.com/
- 📘 Official API Docs: https://docs.copicake.com/

# Installations

## For npm user

```bash
npm install --save @copicake/copicake-js
```

## For yarn user

```bash
yarn add @copicake/copicake-js
```

# Usage

## Initialization

You need to initialize to get copicake instance first :

```js
import Copicake from "@copicake/copicake-js";

const copicake = new Copicake({
  apiKey: "your-api-key",
});
```

## Image

### Create an image

#### create(data: `Object`)

```js
copicake.image
  .create({
    template_id: "YOU_TEMPLATE_ID",
    changes: [
      { name: "text-9so09m", text: "hello world", fill: "#ff0000" },
      { name: "image-yeavh7", src: "https://your_website.com/test.png" },
    ],
    options: {
      webhook_url: "https://your_website.com/webhook_url",
    },
  })
  .then((response) => {
    // You will get a rendering response with processing state.
    // https://docs.copicake.com/#/api/v1/image/create?id=response
    console.log(response);
  })
  .catch((error) => {
    // For more details, please check https://docs.copicake.com/#/errors
    console.error(error);
  });
```

### Get an image

#### get(renderingId: `string`)

```js
const renderingId = `YOUR_RENDERING_ID`;

copicake.image
  .get(renderingId)
  .then((response) => {
    // For more details, please check https://docs.copicake.com/#/api/rendering
    console.log(response);
  })
  .catch((error) => {
    // For more details, please check https://docs.copicake.com/#/errors
    console.error(error);
  });
```

### Get an image (long polling)

#### getUntilFinished(renderingId: `string`)

Sometimes you may notice that your image is still under `processing` state, this is because the image is still being processed in the background by our servers.

In this way, we provide another handy method called `getUntilFinished()` to get the image until the image is ready.

Internally, this is just a wrapper of `get()` method with built-in retry mechanism. If after `MAX_RETRY_TIMES` and the image is still under `processing` state, we will throw an error (500) to let you know.

```js
const renderingId = `YOUR_RENDERING_ID`;

copicake.image
  .getUntilFinished(renderingId)
  .then((response) => {
    // For more details, please check https://docs.copicake.com/#/api/rendering
    if (response.status === "success") {
      // do something
    } else if (response.status === "failed") {
      // do something
    }
  })
  .catch((error) => {
    // For more details, please check https://docs.copicake.com/#/errors
    console.error(error);
  });
```

## Utils

### Create a temporary image for later use

#### uploadTempImage(file: `File | Buffer`, type: `"png" | "gif" | "jpg" | "jpeg"`)

If you don't have a server to host images, we provided a handy way to let you upload a temporary image to our s3 and you can use the returned URL for later use.

1. [File](https://developer.mozilla.org/en-US/docs/Web/API/File) on Browser
2. [Buffer](https://nodejs.org/api/buffer.html#buffer) on Node.js

**P.S. Every temporary image will be removed within 1 day to avoid abuse**

```js
copicake.utils
  .uploadTempImage(file, "png")
  .then((result) => {
    // result === https://s3.ap-northeast-1.amazonaws.com/copicake/temp/ak0zixy6rewsh6vaamzi.png
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
