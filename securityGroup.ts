import { NetworkManagementClient } from "@azure/arm-network";

export const createNetWorkSecurityGroup = async (
  network_client: NetworkManagementClient
) => {
  const securityGroups = network_client.networkSecurityGroups.listAll();
  for await (const item of securityGroups) {
    console.log("=====");
    console.log(item);
  }

  const newSecurityGroup =
    await network_client.networkSecurityGroups.beginCreateOrUpdateAndWait(
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
};