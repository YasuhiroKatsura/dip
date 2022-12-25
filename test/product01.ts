import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, waffle } from "hardhat";

describe("product01", function () {
  async function deploymentFixture() {

    const [deployer, insured01]  = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("product01");
    const product01 = await Contract.connect(deployer).deploy();
    await console.log('I am test', ethers.provider.getBalance(product01.address))

    return { deployer, insured01, product01 };
  }

  describe("Deployment", function () {
    it("riskpoolのアドレスがスマコンのアドレスであることを確認", async function () {
      const { product01 } = await loadFixture(deploymentFixture);
      expect(await product01.riskpool()).to.equal(product01.address);
    });
  });

  // describe("Events", function () {
  //   it("send_premium実行時にイベントが発行されることを確認", async function () {
  //     const { insured01, product01 } = await loadFixture(deploymentFixture);

  //     await expect(product01.connect(insured01).send_premium({ value: ethers.utils.parseEther("1") }))
  //       .to.emit(product01, "eventPremiumSent")
  //       .withArgs(insured01.address, anyValue, anyValue);
  //   });
  // });

  describe("send_premium", function () {
    it("send_premiumが正常に実行されることの確認", async function () {
      const { insured01, product01 } = await loadFixture(deploymentFixture);

      let premium = ethers.utils.parseEther("0.0001")
      await expect(product01.connect(insured01).send_premium({ value: premium })).not.to.be.reverted;
    });
  });

  // describe("get_balance", function () {
  //   it("get_balanceが正常に実行されることの確認", async function () {
  //     const { insured01, product01 } = await loadFixture(deploymentFixture);

  //     let premium = ethers.utils.parseEther("0.0001")
  //     await expect(product01.connect(insured01).get_balance()).toBeGreaterThan(0);
  //   });
  // });

});
