import "dotenv/config";
import {
  NetworkManagementClient,
  Subnet,
  VirtualNetwork,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

// 前定義
const resourceGroup = process.env.RESOURCE_GROUP!;
const location = process.env.LOCATION!;
const virtualNetworkName = "groupC";
const subnetName = "subnet_name";

const vNetAddress = ["10.50.0.0/16"];
const subNetAddress = "10.50.0.0/24";

// VNet, Subnet(1つ)作成
let network_client: NetworkManagementClient;
async function createVirtualNetwork() {
  // VNet
  const parameter: VirtualNetwork = {
    location,
    addressSpace: {
      addressPrefixes: vNetAddress,
    },
  };
  const virtualNetworks_create_info =
    await network_client.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      parameter
    );

  console.log(virtualNetworks_create_info);

  // SubNet
  const subnet_parameter: Subnet = {
    addressPrefix: subNetAddress,
  };
  const subnet__create_info =
    await network_client.subnets.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      subnetName,
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
