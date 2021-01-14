import { createFsJsonAndFactory } from './features/wizzi/factory';
import { generateArtifact, executeJob } from './features/wizzi/productions';
import { packiTypes } from './features/packi';
import { githubApiCalls } from './features/github';

const github_access_token = '410a1368f1ba83cae84efac295b7ac0b4afe4b92';

async function testCloneGithubRepo() {
    const result = await githubApiCalls.cloneBranch(
        { name: 'packi-demo-strawberry', owner: 'stfnbssl', token: github_access_token },
        'master'
    );
    console.log('testCloneGithubRepo.files', result.files);
    console.log('testCloneGithubRepo.commitHistory', result.commitHistory);
}

async function testUpdateGithubRepo(files: packiTypes.PackiFiles) {
    const result = await githubApiCalls.updateBranch(
        files,
        { name: 'packi-demo-strawberry', owner: 'stfnbssl', token: github_access_token },
        'master'
    );
}

async function testTemplateRepositories() {
    const result = await githubApiCalls.getPackiTemplateRepositories();
    console.log('testTemplateRepositories', result);
}

async function testFactory() {
    const wf = await createFsJsonAndFactory({
        'x/d/a.js.ittf': { type: 'CODE', contents: 'Hey' },
        'x/d/b.html.ittf': { type: 'CODE', contents: 'Hey' },
    })
    console.log(wf);
}
async function testArtifactGenerator() {
    const wf = await generateArtifact(
        'x/a.js.ittf',
        {
            'x/a.js.ittf': { type: 'CODE', contents: 'module\n\tkind jsfile\n\tb()' },
            'x/t/b.js.ittf': { type: 'CODE', contents: 'log "Hello"' },
        }
    );
    console.log(wf);
}

async function testWizziJob() {
    const wf = await executeJob(
        'x/gen.wfjob.ittf',
        {
            'x/src/a.js.ittf': { type: 'CODE', contents: 'module\n\tkind jsfile\n\tb()' },
            'x/src/t/b.js.ittf': { type: 'CODE', contents: 'log "Hello"' },
            'x/gen.wfjob.ittf': { type: 'CODE', contents: `wfjob

    $
        var ittf_src_folder        = path.join(__dirname, 'src');
        var dest_folder            = path.join(__dirname, '..', 'src');


    line src
        cwd-folder x{ittf_src_folder}

        artifact javascript modules
            src ./**/*.js.ittf
            schema js
            generator js/module
            extension js

    production
        dest-folder x{dest_folder}
        line-ref src

            `.replace(/x{/g, '${') },
        }
    );
    console.log(wf.toJson((err, result)=>{
        console.log(JSON.stringify(result, null, 2));
    }));
}

// testWizziJob();
// testCloneGithubRepo();
/*
testUpdateGithubRepo({
    'index.ts': {
        type: 'CODE',
        contents: 'console.log("Hello world")'
    }
})
*/
testTemplateRepositories();