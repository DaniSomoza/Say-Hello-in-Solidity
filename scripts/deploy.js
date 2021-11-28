require("dotenv").config();

const { ETHERSCAN_URL, CONTRACT_NAME } = process.env;

async function main() {
  // A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  const SayHello = await ethers.getContractFactory(CONTRACT_NAME);

  // Start deployment, returning a promise that resolves to a contract object
  const sayHello = await SayHello.deploy("Daniel");
  console.log("sayHello Contract deployed to address:", sayHello.address);
  const etherscanUrl = `${ETHERSCAN_URL}/${sayHello.address}`;
  console.log("Etherscan url: ", etherscanUrl);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
