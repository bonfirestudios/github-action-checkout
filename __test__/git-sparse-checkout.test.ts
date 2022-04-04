import {createCommandManager} from '../lib/git-command-manager'

jest.setTimeout(10 * 60 * 1000);

describe('git-sparse-checkout tests', () => {
    it('sparse', async () => {
        let cm = await createCommandManager('../torch', true);
        let configFile = await cm.show('93ec434369326ba8df5efb9a91c5cb240725e76d:.sparkgit');

        if (configFile) {
            let config = JSON.parse(configFile)
            let sparse = config.sparse;
            if (sparse) {
                let rules = [sparse.base];
                for (const option of sparse.options) {
                    rules.push(option.disabledPattern)
                }
                let sparseRules = rules.join('\n')
                let result = await cm.sparseCheckoutSet(sparseRules);
                expect(result).toBeTruthy()
            } else {
                let result = await cm.sparseCheckoutDisable();
                expect(result).toBeTruthy()
            }
        }
    })
})
