const myName = "magento2-snowplow-js";
module.exports = targets => {
  const builtins = targets.of("@magento/pwa-buildpack");
  builtins.specialFeatures.tap(featuresByModule => {
    featuresByModule[myName] = {
      esModules: true,
      cssModules: true,
    };
  });
  builtins.envVarDefinitions.tap(defs => {
    defs.sections.push({
      name: "Product Recommendations Engine",
      variables: [
        {
          name: "SNOWPLOW_URL",
          type: "str",
          desc: "Base URL of the domain where the Snowplow tracker lives",
        },
        {
          name: "SNOWPLOW_COLLECTOR",
          type: "str",
          desc: "Pathname of the Snowplow collector API endpoint",
        },
        {
          name: "SNOWPLOW_APP_ID",
          type: "str",
          desc: "Snowplow app identifier",
          default: "magento-ds",
        },
      ],
    });
  });
  targets.of("@magento/peregrine").talons.tap(talons => {
    talons.App.useApp.wrapWith(`${myName}/pwa/lib/wrappers/wrapUseApp`);
    talons.ProductFullDetail.useProductFullDetail.wrapWith(
      `${myName}/pwa/lib/wrappers/wrapUseProductFullDetail`,
    );
    return talons;
  });
};
