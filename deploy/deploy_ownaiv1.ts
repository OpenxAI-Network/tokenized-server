import { Address, Deployer } from "../web3webdeploy/types";

export interface DeploymentSettings {
  forceRedeploy?: boolean;
}

export interface Deployment {
  tokenizedServerV1: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: DeploymentSettings
): Promise<Deployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "OwnAIv1.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const tokenizedServerV1 = await deployer
    .deploy({
      id: "OpenxAITokenizedServerV1",
      contract: "OpenxAITokenizedServerV1",
    })
    .then((deployment) => deployment.address);

  const minter = "0x3Fd1D3f2D21Ce04586ADf3A81202dBBEa6B5Ad2e";
  await deployer.execute({
    id: "OpenxAITokenizedServerV1Minter",
    abi: "OpenxAITokenizedServerV1",
    to: tokenizedServerV1,
    function: "grantRole",
    args: [deployer.viem.keccak256(deployer.viem.toBytes("MINT")), minter],
    from: "0x3e166454c7781d3fD4ceaB18055cad87136970Ea",
  });

  const deployment = {
    tokenizedServerV1: tokenizedServerV1,
  };
  await deployer.saveDeployment({
    deploymentName: "OwnAIv1.json",
    deployment: deployment,
  });
  return deployment;
}
