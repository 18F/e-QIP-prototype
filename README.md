# Project Culper

[![Build Status][badge_ci_18f]][2] [![codecov][badge_cov_18f]][24] [![Code Climate][badge_cc_18f]][3] [![Go Report Card][badge_goreportcard_18f]][22]

To create the applicant questionnaire for the National Background Investigation System (NBIS), the project team is employing a user-centered design approach leveraging key principles from the [U.S. Digital Services Playbook][8]:

1. Understand what people need
1. Address the whole experience, from start to finish
1. Make it simple and intuitive

_Culper_ is a responsive, mobile-friendly web application that applicants can use to fill out an [SF-86][26], [SF-85][27], or [SF-85P][28]. It forms the foundation of _eApp_, which is part of a larger [NBIS information technology system][25].


## Table of contents

- [Project Management](#project-management)
- [Development](#development)
- [Architectural diagram](#architectural-diagram)
- [Additional](#additional)
- [Contributing](#contributing)

## Project Management

The project team primarily utilizes a [private NBIS tool](https://docs.google.com/document/d/1X-4M4-hLOziK6CyXoe8GhdfSjzzY5EYQLXcLmXpNqds) to administer user stories, defects, and tasks. Users of this open source code however are welcome to report issues via [GitHub](https://github.com/18F/culper/issues). Higher-level and non-development tasks are tracked in [a Trello board](https://trello.com/b/xexcFZ81/eapp-internal).

Documentation for this software is maintained under [`docs`](./docs) and in a [private wiki](https://docs.google.com/document/d/1pgFmYxVQIbfOi68CUypXWdrPAU7kPivKeLCSW0qgHso).

## Development

### Initial setup

#### Dependencies

- [git](https://git-scm.com)
- [docker][21]
- [docker-compose][20]
- [make](https://www.gnu.org/software/make/)

For more information on licenses and third-party source code, use a tool like [this one](https://github.com/bmallred/licenses).

#### Clone all things

Clone the repository and `cd` into it:

```shell
git clone https://github.com/18F/culper
cd culper
```

Then to develop locally, create a [`.env`](.env.example) file:

```shell
cp .env.example .env
```

For more information on the various settings, examples, and values please refer to the [configuration](docs/CONFIGURATION.md) documentation.

#### Tests

To do the initial setup and ensure that all tests pass locally:

```shell
make
```

#### Setting up the database for API integration tests

```shell
cd api
make reset-test-db
```

#### Pre-Commit Hooks

There are some pre commit hooks added using [husky](https://github.com/typicode/husky) to run them. The pre-commit hooks are designed to run outside of docker for speed so you will need to have run `yarn install` outside the containers if you have not done so.

The hooks should automatically be applied once `yarn install` is complete, and will run the eslint and css lint rules on files changed that are staged for commit. Developers should apply lint fixes; however, specifiying `--no-verify` as an argument to `git commit` to bypass this check for temporary wip commits.

The eslint rules for the pre-commit hook will be using a stricter standard than the CI build to allow us to improve the code as we modify files while avoiding having to fix all the errors that would be generated if the rules were applied to the whole project immediately. Eventually we will want to apply the stricter rules to the CI build as well.

### Running a local server

To run a local server, we are using [docker][21] containers leveraging the [docker-compose][20] tool via the command:

```shell
make run
```

Then direct your browser at [http://localhost:8080](http://localhost:8080). The access the site in development use the username `test01` and password `password01`. If you make changes to frontend files, the site will automatically rebuild after ~10 seconds.

#### How it works

The Make target calls Docker Compose, which then runs containers for various parts of the system. Frontend assets are built from their own containers into the `dist/` folder, which are then served by nginx. There is also an API backend (under [`api/`](api)) written in Go, which has a PostgreSQL database behind it. See the [architecture diagram](#architectural-diagram) below.

See also: [frontend docs](docs/frontend.md).

## Architectural diagram

![eapparchitecture](https://user-images.githubusercontent.com/12962390/37600234-1ecdb4ba-2b5d-11e8-99b3-a07f46aef611.png)

There are several possible architectures which may be implemented. The diagram references one of those possible solutions and highlights the basic flow of data within the system. It also demonstrates integration with external systems (e.g. identity services) which are not part of this project but may be part of the overall system.

## Additional

See [advanced docs](docs/advanced.md) for more.

### Tooling

See [tools docs](docs/dev-tools.md) for more.

#### Formatting

Supported files are formatted using [Prettier](https://prettier.io/), though note this should only be done when a file is new or heavily modified. You should install Prettier for whatever editor you use.

#### Linters

- Vim users: install `syntastic`
- Emacs users: install `flycheck`

For command-line alternatives there are the following:

- For CSS, run `make lint-css`
- For JavaScript, run `make lint-js`
- For HTML, [html-lint][15] which may be installed with `yarn add html-lint`

## Contributing

Please refer to the [contributing documentation][18].

[badge_chat]: https://img.shields.io/badge/chat-slack-green.svg
[badge_ci_18f]: https://circleci.com/gh/18F/culper.svg?style=shield
[badge_cc_18f]: https://codeclimate.com/github/18F/culper/badges/gpa.svg
[badge_cov_18f]: https://codecov.io/gh/18F/culper/branch/master/graph/badge.svg
[badge_goreportcard_18f]: https://goreportcard.com/badge/github.com/18F/culper
[1]: https://gsa-tts.slack.com/messages/acq-e-qip-vendor
[2]: https://circleci.com/gh/18F/culper
[3]: https://codeclimate.com/github/18F/culper
[8]: https://playbook.cio.gov/#plays_index_anchor
[9]: https://help.github.com/articles/tracking-the-progress-of-your-work-with-projects
[14]: http://jshint.com
[15]: https://github.com/curtisj44/HTML-Lint
[16]: https://www.npmjs.com
[18]: CONTRIBUTING.md
[19]: https://yarnpkg.com
[20]: https://docs.docker.com/compose
[21]: https://docker.com
[22]: https://goreportcard.com/report/github.com/18F/culper
[24]: https://codecov.io/gh/18F/culper
[25]: https://disa.mil/NewsandEvents/2018/security_clearance_investigations
[26]: https://www.gsa.gov/forms-library/questionnaire-national-security-positions
[27]: https://www.gsa.gov/forms-library/questionnaire-non-sensitive-positions
[28]: https://www.gsa.gov/forms-library/questionnaire-public-trust-positions
