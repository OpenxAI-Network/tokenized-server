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
      deploymentName: "OwnAIV1.json",
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

  const deployment = {
    tokenizedServerV1: tokenizedServerV1,
  };
  await deployer.saveDeployment({
    deploymentName: "OwnAIV1.json",
    deployment: deployment,
  });
  return deployment;
}
