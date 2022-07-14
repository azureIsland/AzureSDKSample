import "dotenv/config";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";
import { createVirtualNetwork } from "./src/network";
import { containerGroup } from "./src/containerInstance";

// 前定義
const resourceGroup = process.env.RESOURCE_GROUP!;
const location = process.env.LOCATION!;
const virtualNetworkName = "groupC";
const subnetName = "subnet_name";

const vNetAddress = ["10.50.0.0/16"];
const subNetAddress = "10.50.0.0/24";

async function main() {
  // 認証
  const subscriptionId = process.env.AZURE_SUBSCRIPTION!;

  const client = new ContainerInstanceManagementClient(
    new DefaultAzureCredential(),
    subscriptionId!
  );
  containerGroup(
    client,
    resourceGroup,
    "test-resource-group",
    "test-container-group"
  );
  // network_client = new NetworkManagementClient(
  //   new DefaultAzureCredential(),
  //   subscriptionId!
  // );
  // createVirtualNetwork();
  // createNetWorkSecurityGroup(network_client, "", "");
}
main();
