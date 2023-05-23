require('dotenv').config()
const endpoint = `https://api.vercel.com/v1/edge-config/${process.env.REACT_APP_EDGE_CONFIG_ID}/items`;

const request = {
  items: [
    {
      operation: "update",
      key: "testaddress",
      value: "testtestcode",
    },
  ],
};
async function update() {
  try {
    const updateEdgeConfig = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_VERCEL_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const result = await updateEdgeConfig.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

update()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
