import "dotenv/config";
import {
  NetworkManagementClient,
  Subnet,
  VirtualNetwork,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

// VNet作成
const resourceGroup = process.env.RESOURCE_GROUP!;
const location = process.env.LOCATION!;

let network_client: NetworkManagementClient;
async function createVirtualNetwork() {
  const parameter: VirtualNetwork = {
    location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
  };
  const virtualNetworks_create_info =
    await network_client.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroup,
      "network2",
      parameter
    );

  console.log(virtualNetworks_create_info);

  const subnet_parameter: Subnet = {
    addressPrefix: "10.0.0.0/24",
  };
  const subnet__create_info =
    await network_client.subnets.beginCreateOrUpdateAndWait(
      resourceGroup,
      "network2",
      "subnet_name",
      subnet_parameter
    );
  console.log(subnet__create_info);
}

async function main() {
  // 認証
  const subscriptionId = process.env.AZURE_SUBSCRIPTION!;
  network_client = new NetworkManagementClient(
    new DefaultAzureCredential(),
    subscriptionId!
  );
  createVirtualNetwork();
}
main();
