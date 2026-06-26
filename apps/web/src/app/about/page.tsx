// apps/web/src/app/about/page.tsx
// PROJECT OBSIDIAN — About Page

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-16 text-center">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold tracking-widest mb-6 inline-block">
          NOTRE HISTOIRE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text font-grotesk uppercase drop-shadow-lg mb-6">
          L'Excellence Automobile au <span className="text-primary">Maroc</span>
        </h1>
        <p className="text-textMuted font-mono text-sm max-w-2xl mx-auto leading-relaxed">
          Bienvenue chez Car Store. Nous sommes avant tout des passionnés de belles mécaniques, et notre but est simple : vous offrir la meilleure expérience possible pour l'achat de votre prochain véhicule premium.
        </p>
      </div>

      <div className="space-y-12">
        {/* L'Histoire */}
        <div className="glass-panel p-8 md:p-12 border-l-4 border-l-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-48 h-48 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-text font-grotesk mb-6">COMMENT TOUT A COMMENCÉ</h2>
            <div className="space-y-4 text-textMuted font-mono text-sm leading-relaxed">
              <p>
                Tout est parti d'un constat évident : pourquoi l'achat d'une voiture de luxe au Maroc devrait-il être un processus long et compliqué ? Depuis nos locaux à Technopolis (Rabat), nous avons voulu créer un endroit où trouver et acheter une voiture de prestige est aussi fluide et agréable que de la conduire.
              </p>
              <p>
                Aujourd'hui, nous accompagnons nos clients partout au Maroc, de Casablanca à Tanger en passant par Marrakech et Agadir, pour dénicher les véhicules les plus incroyables du marché et vous les livrer en toute tranquillité.
              </p>
            </div>
          </div>
        </div>

        {/* L'Expérience & L'Expertise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 group hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-bold text-text font-grotesk mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              ON NE LAISSE RIEN AU HASARD
            </h3>
            <p className="text-textMuted font-mono text-sm leading-relaxed">
              Avant qu'une voiture n'arrive sur notre site, notre équipe l'examine sous toutes les coutures. On passe en revue plus de 150 points de contrôle pour être absolument certains que vous n'aurez aucune mauvaise surprise le jour de la réception.
            </p>
          </div>
          
          <div className="glass-panel p-8 group hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-bold text-text font-grotesk mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-primary" />
              REMISE DES CLÉS VIP
            </h3>
            <p className="text-textMuted font-mono text-sm leading-relaxed">
              L'expérience ne s'arrête pas à un clic sur internet. Dès que tout est validé, on s'occupe de la logistique. On vous livre la voiture directement devant chez vous, en toute discrétion, et on prend le temps de vous expliquer comment tout fonctionne.
            </p>
          </div>
        </div>

        {/* Tech & Engagement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold text-text font-grotesk mb-4">UN ACHAT SIMPLIFIÉ</h3>
            <p className="text-textMuted font-mono text-xs mb-6 leading-relaxed">
              Oubliez la paperasse interminable et les allers-retours en concession. Tout est pensé pour vous faire gagner du temps.
            </p>
            <ul className="space-y-3 font-mono text-xs text-textDim">
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Réservation en quelques clics</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Plateforme ultra-sécurisée</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Vos données restent 100% privées</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Démarches simplifiées</li>
            </ul>
          </div>
          
          <div className="glass-panel p-8">
            <h3 className="text-lg font-bold text-text font-grotesk mb-4">NOTRE PROMESSE</h3>
            <p className="text-textMuted font-mono text-xs mb-6 leading-relaxed">
              Pas de frais cachés, pas de détours. On joue carte sur table dès le premier contact.
            </p>
            <ul className="space-y-3 font-mono text-xs text-textDim">
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Historique des voitures limpide</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Une équipe humaine toujours joignable</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> Des prix affichés nets et précis</li>
              <li className="flex items-center gap-2"><span className="text-primary">›</span> On s'occupe de toute la paperasse</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
