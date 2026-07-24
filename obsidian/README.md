# Bóveda de Obsidian — Mapa de Pat

`pat-map/` es una **copia autogenerada** de la malla del mapa de Pat: las
relaciones **Sector → Actividad → Feria → Ciudad**, con una nota por entidad y
enlaces `[[...]]` (para la vista de grafo de Obsidian) más metadatos en
frontmatter (para Dataview).

## No editar a mano

El contenido de `pat-map/` lo **regenera** `scripts/export_obsidian_mesh.mjs` a
partir de los datos reales (`fairsData.js`, `fairTags.js`, `iberiaMeshData.js`).
Cualquier edición manual se perderá en la siguiente sincronización.

## Sincronización automática

El workflow `.github/workflows/sync_obsidian.yml` regenera esta bóveda y la
commitea sola cada vez que cambian los datos de ferias (push a `main` que toque
los ficheros fuente), y también se puede lanzar a mano desde la pestaña Actions.

## Usarla en Obsidian (auto-pull)

1. Instala el plugin comunitario **Obsidian Git**.
2. Abre este repo (o una copia sincronizada) como vault, o añade `obsidian/pat-map`
   a tu vault.
3. Configura Obsidian Git para **auto-pull** cada X minutos: así, cuando el
   workflow actualiza la bóveda en GitHub, tu Obsidian la recibe sola.

## Regenerar a mano

```bash
node scripts/export_obsidian_mesh.mjs --out obsidian/pat-map        # español
node scripts/export_obsidian_mesh.mjs --out obsidian/pat-map --lang en
```
