import {
  NetworkManagementClient,
  Subnet,
  VirtualNetwork,
} from "@azure/arm-network";

// VNet, Subnet(1つ)作成
export const createVirtualNetwork = async (
  networkClient: NetworkManagementClient,
  resourceGroup: string,
  location: string,
  vNetAddresses: string[],
  virtualNetworkName: string,
  subnetAddress: string,
  subnetName: string
) => {
  // VNet
  const parameter: VirtualNetwork = {
    location,
    addressSpace: {
      addressPrefixes: vNetAddresses,
    },
  };
  const virtualNetworks_create_info =
    await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      parameter
    );

  console.log(virtualNetworks_create_info);

  // SubNet
  const subnet_parameter: Subnet = {
    addressPrefix: subnetAddress,
  };
  const subnet__create_info =
    await networkClient.subnets.beginCreateOrUpdateAndWait(
      resourceGroup,
      virtualNetworkName,
      subnetName,
      subnet_parameter
    );
  console.log(subnet__create_info);

  return {
    vNet: virtualNetworks_create_info,
    subnet: subnet__create_info,
  };
};
