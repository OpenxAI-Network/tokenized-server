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
      deploymentName: "CreditDeposit.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const tokenizedServerV1 = await deployer
    .deploy({
      id: "OpenxAICreditDeposit",
      contract: "OpenxAICreditDeposit",
    })
    .then((deployment) => deployment.address);

  const deployment = {
    tokenizedServerV1: tokenizedServerV1,
  };
  await deployer.saveDeployment({
    deploymentName: "CreditDeposit.json",
    deployment: deployment,
  });
  return deployment;
}
