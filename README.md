# Chatbox
A chatform for educational games.

## Usage
- `npm install`: Install dependencies
- `npm run dev`: Run dev server at http://localhost:3000
- `npm run build`: Build the app for production to the `dist` folder

## Future Plans
### Generalize question concept
Currently, a question simply loops until it receives the correct answer, then continues with the next beat.
In a more general concept, a question could simply be a function, which maps a given input to
- any of x possible next dialog branches ("Would you like a tougher challenge?" -> yes-path / no-path)
  - Since game definitions are pure TS files, each path can be stored in a variable, which should make merging easy
- a response + loopback (as we currently do on wrong answer)
- any side effect (backend request, capturing an artifact (see below), etc.)
- any combination of the above

### Capture artefacts
Capture facts that arise along the game, such as important answers or generated / observed values, for later use.

```ts
enum ArtifactKeys {
  PLAYER_NAME,
  IS_STRUGGLING,
}

// At some point while processing an answer to the question "What's your name?"...
Artefacts.captureString(ArtifactKeys.PLAYER_NAME, answer);

// After the third failed attempt on the same question (do we have the means to track this by question / globally?)...
Artefacts.captureBool(ArtifactKeys.IS_STRUGGLING, true)

// Then later...
if (Artefacts.readBool(ArtifactKeys.IS_STRUGGLING)) { 
  DialogLine.of(`Do you need help, ${Artefacts.readString(ArtifactKeys.PLAYER_NAME)}`);
}

// And maybe even...
fetch('https://my-backend.example/chatboxStudentProgress/reportTaskComplete', {
  method: 'POST',
  body: {
    'username': Artifacts.readString(ArtifactKeys.PLAYER_NAME),
    'gameId': 'cryptoBasics',
    'taskId': 'caesar-decrypt-no-key',
    'stats': {
      'numCompletedTasks': 3
    }
  }
})
```

### Some concept of navigation
While it is out-of-scope for this project to provide its own mechanism for saving game states, it should support a way
to implement this functionality from the outside (e.g. by reporting task completions to a backend and loading this
information when starting the game, see above). For that, we need some concept of navigation. For instance, tasks
should probably have IDs. Maybe branches also have IDs, since the same task might occur in more than one branch, and
more than once in general.

Basically, it should be possible to capture the complete game progress (completed tasks, stats, and maybe even given
answers) at any point, and reload the game with that exact state later on.

### Configuration + extracting a library
It should be possible to deploy this application standalone, or embed it into an existing application (such as a
teaching website).

There should be these distinct components:
- Container: used when deploying as standalone application
- Theme: use default or provide custom 
- Core / game engine: receives game file, operates on theme
- type definitions for developing for custom game files
