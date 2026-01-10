const getData = async (): Promise<{ timestamp: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ timestamp: new Date().toISOString() });
    }, 5000);
  });
};

export default async function HeaderPage() {
  const { timestamp } = await getData();
  return <div className="bg-red-300">HeaderPage {timestamp}</div>;
}
