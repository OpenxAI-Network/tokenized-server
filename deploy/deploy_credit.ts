import { Address, Deployer } from "../web3webdeploy/types";

export interface DeploymentSettings {
  forceRedeploy?: boolean;
}

export interface Deployment {
  creditDeposit: Address;
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

  const creditDeposit = await deployer
    .deploy({
      id: "OpenxAICreditDeposit",
      contract: "OpenxAICreditDeposit",
    })
    .then((deployment) => deployment.address);

  const deployment = {
    creditDeposit: creditDeposit,
  };
  await deployer.saveDeployment({
    deploymentName: "CreditDeposit.json",
    deployment: deployment,
  });
  return deployment;
}
