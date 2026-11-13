"""Version-independent, thematic destinations for production generator sprites."""
from pathlib import PurePosixPath

def generator_path(group,name):
    if group=='interior':
        category='indoor/arena' if name in {'training-dummy','practice-rack','archery-target','trophy'} else 'indoor/household'
    elif group=='town':
        category='outdoor/buildings' if name in {'cottage','ranger-hut','chapel','caravan'} else 'outdoor/town/borders' if name in {'stone-wall','palisade'} else 'outdoor/town/furniture'
    else:
        category='outdoor/camping' if name in {'supply-cart','bedroll'} else 'outdoor/ruins' if name in {'broken-column','waystone','ruined-arch','woodland-shrine'} else 'outdoor/nature'
    return PurePosixPath('assets/generator')/category/(name+'.webp')
