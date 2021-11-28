require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY, CONTRACT_ADDRESS, CONTRACT_NAME } = process.env;

task("getGreetings", "Prints an account's greeting")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);

    const contract = await MyContract.attach(
      CONTRACT_ADDRESS // The deployed contract address
    );

    // Now you can call functions of the contract
    const greetings = await contract.greetings;

    console.log("Greeting: ", await greetings(taskArgs.account));
  });

task("sayHelloTo", "Say hello to someone")
  .addParam("someone", "Someone to greeting")
  .setAction(async (taskArgs) => {
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);

    const contract = await MyContract.attach(
      CONTRACT_ADDRESS // The deployed contract address
    );

    // Now you can call functions of the contract
    const sayHelloToTransaction = await contract.sayHelloTo(taskArgs.someone);

    await sayHelloToTransaction.wait();

    const greetings = await contract.greetings;

    console.log("Greeting: ", await greetings(sayHelloToTransaction.from));
  });

module.exports = {
  solidity: "0.8.0",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    localhost: {},
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      network_id: 4,
      gas: 10000000,
    },
  },
};
