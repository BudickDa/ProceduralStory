config = {
    height: 1000,
    width: 1000,
    /**
     * x in 100
     */
    probabilities: {
        instance: 15
    }
};

seed = `K8YKP1kO1bHYgoZSRChY
        OtV1OSJZIfu9NeyeJtZR
        4gRTJgZfLdVBNm7nm24m
        WAhyCbhAdtdTcD7FDXT1
        UrkVM8dljxn9dq1WhiwR
        PZy02uwQVUzDgVAYBk2L
        wOTjS2ok27CEGpqtypjp
        PNOf42AGHkSEvfGhAGyO
        n8yNNgYG0fE2adaiGCMh
        WdjHGWpgx9vTVBBjGgCY
        9Oyp5FGqNjR8aWeHo5zS
        3meOW6NcmEC08rA2q15P
        NUpPdr0o8PA10cPvgxSh
        lKJtEuIHWSBr9PSEM0f7
        Vg6AcruQiNYkIeICTujO
        gB93of2k4hc9O7b3Y3rJ
        HypkbwSV9HYat9kRdvpO
        SP7msN6gf9mM7ewDpvOw
        eMB26HmzOwvDlZn7pmlZ
        TTBoQS3Z1FuHUA9R9cUc`;

Spielebuch.Gameplay.damage = 'Damage';
Spielebuch.Gameplay.hitpoints = 'Health';
Spielebuch.Gameplay.defense = 'Armor';
Spielebuch.Settings.debug = false;

Rules = {
    humanHealth: new Spielebuch.Rule(Spielebuch.Gameplay.hitpoints, 80),
    humanFistDamage: new Spielebuch.Rule(Spielebuch.Gameplay.damage, 20)
};