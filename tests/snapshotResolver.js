module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath
      .replace("components/", "tests/__snapshots__/components/")
      .replace("containers/", "tests/__snapshots__/containers/") + snapshotExtension,

  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace("tests/__snapshots__/components/", "components/")
      .replace("tests/__snapshots__/containers/", "containers/")
      .slice(0, -snapshotExtension.length),

  testPathForConsistencyCheck: "components/some.test.ts",
}
