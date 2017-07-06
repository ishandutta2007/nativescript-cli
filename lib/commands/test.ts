import { Configurations } from "../common/constants";

function RunTestCommandFactory(platform: string) {
	return function RunTestCommand(
		$options: IOptions,
		$testExecutionService: ITestExecutionService,
		$projectData: IProjectData) {
		$projectData.initializeProjectData();
		const projectFilesConfig: IProjectFilesConfig = {
			configuration: this.$options.release ? Configurations.Release.toLowerCase() : Configurations.Debug.toLowerCase()
		};
		this.execute = (args: string[]): Promise<void> => $testExecutionService.startTestRunner(platform, $projectData, projectFilesConfig);
		this.allowedParameters = [];
	};
}

$injector.registerCommand("dev-test|android", RunTestCommandFactory('android'));
$injector.registerCommand("dev-test|ios", RunTestCommandFactory('iOS'));

function RunKarmaTestCommandFactory(platform: string) {
	return function RunKarmaTestCommand($options: IOptions, $testExecutionService: ITestExecutionService, $projectData: IProjectData) {
		$projectData.initializeProjectData();
		const projectFilesConfig: IProjectFilesConfig = {
			configuration: this.$options.release ? Configurations.Release.toLowerCase() : Configurations.Debug.toLowerCase()
		};
		this.execute = (args: string[]): Promise<void> => $testExecutionService.startKarmaServer(platform, $projectData, projectFilesConfig);
		this.allowedParameters = [];
	};
}

$injector.registerCommand("test|android", RunKarmaTestCommandFactory('android'));
$injector.registerCommand("test|ios", RunKarmaTestCommandFactory('iOS'));
