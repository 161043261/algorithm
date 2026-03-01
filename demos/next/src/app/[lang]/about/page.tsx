"use server";

const getData = async (): Promise<{ timestamp: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timestamp: new Date().toISOString() });
    }, 5000);
  });
};

async function AboutPage() {
  const data = await getData();
  return <div className="bg-yellow-300">About me {data.timestamp}</div>;
}

export default AboutPage;
