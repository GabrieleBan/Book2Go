export default class Subscriptions {
    // livelli subscription
    static LEVELS = {
        UNSUBSCRIBED: 0,
        SUB_TIER1: 1,
        SUB_TIER2: 2,
    };


    static canAccessLendable(userSubscription, options = []) {
        if (!options.length) return true;

        const userLevel = Subscriptions.LEVELS[userSubscription] ?? 0;

        return options.some(opt => {
            const requiredLevel = Subscriptions.LEVELS[opt.minRequiredTier] ?? 0;
            return userLevel >= requiredLevel;
        });
    }


    static getRequiredTier(options = []) {
        if (!options.length) return null;

        return options
            .map(o => o.minRequiredTier)
            .sort((a, b) => Subscriptions.LEVELS[a] - Subscriptions.LEVELS[b])[0];
    }

 
    static getBestOptionForUser(userSubscription, options = []) {
        if (!options.length) return null;

        const userLevel = Subscriptions.LEVELS[userSubscription] ?? 0;

        const availableOpts = options
            .filter(opt => (Subscriptions.LEVELS[opt.minRequiredTier] ?? 0) <= userLevel)
            .sort((a, b) => (Subscriptions.LEVELS[b.minRequiredTier] ?? 0) - (Subscriptions.LEVELS[a.minRequiredTier] ?? 0));

        return availableOpts[0] ?? null;
    }
}