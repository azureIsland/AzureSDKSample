import { NetworkManagementClient } from "@azure/arm-network";

// NSGの作成
export const createNetWorkSecurityGroup = async (
  networkClient: NetworkManagementClient,
  resourceGroup: string,
  location: string
) => {
  const securityGroups = networkClient.networkSecurityGroups.listAll();
  for await (const item of securityGroups) {
    console.log("=====");
    console.log(item);
  }

  const newSecurityGroup =
    await networkClient.networkSecurityGroups.beginCreateOrUpdateAndWait(
      resourceGroup,
      "test_06221815",
      {
        location: location,
        securityRules: [],
        defaultSecurityRules: [
          {
            name: "DenyVnetInBound",
            protocol: "*",
            sourcePortRange: "*",
            destinationPortRange: "*",
            sourceAddressPrefix: "VirtualNetwork",
            sourceAddressPrefixes: [],
            destinationAddressPrefix: "VirtualNetwork",
            destinationAddressPrefixes: [],
            sourcePortRanges: [],
            destinationPortRanges: [],
            access: "Deny",
            priority: 4096,
          },
        ],
      }
    );
  console.log(newSecurityGroup);
  return newSecurityGroup;
};
