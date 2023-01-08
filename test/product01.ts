import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("product01", function () {
  async function deploymentFixture() {

    const [deployer, insured01]  = await ethers.getSigners();

    const premium = ethers.utils.parseEther("0.0001")

    const Contract = await ethers.getContractFactory("product01");
    const product01 = await Contract.connect(deployer).deploy();

    return { deployer, insured01, premium, product01 };
  }


  describe("Deployment", function () {
    it("riskpoolのアドレスがスマコンのアドレスであることを確認", async function () {
      const { product01 } = await loadFixture(deploymentFixture);

      expect(await product01.riskpool())
        .to.equal(product01.address);
    });
  });


  describe("Events", function () {
    it("send_premium実行時にイベントが発行されることを確認", async function () {
      const { insured01, premium, product01 } = await loadFixture(deploymentFixture);

      const tx = product01.connect(insured01).send_premium({ value: premium });

      await expect(tx)
        .to.emit(product01, "eventPremiumSent")
        .withArgs(insured01.address, anyValue, premium);
    });
  });


  describe("send_premium", function () {
    it("send_premiumが正常に実行されることの確認", async function () {
      const { insured01, premium, product01 } = await loadFixture(deploymentFixture);

      const tx = product01.connect(insured01).send_premium({ value: premium });
      
      await expect(tx).not.to.be.reverted;
    });


    it("send_premiumによりriskpoolへ送金されることの確認", async function () {
      const { insured01, premium, product01 } = await loadFixture(deploymentFixture);

      const tx = product01.connect(insured01).send_premium({ value: premium })
      const premiumSentFrom = '-' + premium

      await expect(tx).to.changeEtherBalance(insured01, premiumSentFrom);
    });
  });

});
