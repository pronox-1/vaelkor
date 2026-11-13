/* Local ZIP play retains its synchronous alpha atlas fallback. Online play
   uses the original cached image files without downloading 6 MB of base64 JS. */
(function(root){'use strict';if(root.location.protocol==='file:')root.document.write('<script src="js/world/atlases-offline.js"><'+'/script>');})(globalThis);
