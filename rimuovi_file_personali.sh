#!/bin/bash

# Script per Rimuovere File Personali da GitHub
# Esegui questo su Emergent prima di fare il prossimo push

echo "🔴 Rimozione file personali dal repository..."

# Rimuovi file personali dalla staging area di Git
git rm --cached COME_SALVARE_SU_GITHUB.md
git rm --cached COSA_VA_SU_GITHUB.md
git rm --cached GUIDA_GITHUB_PASSO_PASSO.md
git rm --cached GUIDA_APK_MOBILE.md
git rm --cached PRESENTAZIONE_PORTFOLIO.md
git rm --cached REPOSITORY_STRUCTURE.md
git rm --cached guide_personali_carmine.zip
git rm -r --cached guide_personali_backup/

echo "✅ File rimossi dalla staging area"
echo ""
echo "Ora fai 'Save to GitHub' per applicare le modifiche!"
