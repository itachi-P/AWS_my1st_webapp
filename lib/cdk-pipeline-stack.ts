import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

/**
 * The stack that defines the application pipeline
 */
export class CdkPipelineStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const pipeline = new CodePipeline(this, 'Pipeline', {
			// The pipeline name
			pipelineName: 'MyServicePipeline',

			// How it will be built and synthesized
			synth: new ShellStep('Synth', {
				// Where the source can be found
				input: CodePipelineSource.gitHub('itachi-P/AWS_my1st_webapp', 'main'),

				// Install dependencies, build and run cdk synth
				installCommands: ['npm i -g npm@9.6.7'],
				commands: [
					'npm ci',
					'npm run build',
					'npx cdk synth'
				],
			}),
		});

		// This is where we add the application stages
	}
}
