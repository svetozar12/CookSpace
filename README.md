# CookSpace Monorepo

CookSpace is a full-stack project designed to manage and share recipes using a React frontend (`CookSpace`) and a NestJS GraphQL API backend (`CookSpaceApi`). The project leverages Apollo for GraphQL communication and is built on the Nx monorepo framework for efficient development and management.

---

## Overview

This monorepo includes:

- **CookSpace**: A React-based frontend for displaying and interacting with recipes.
- **CookSpaceApi**: A NestJS-based GraphQL API backend for managing recipe data.
- **Nx Workspace**: Used for project scaffolding, efficient builds, and task management.

---

## Getting Started

### Running the Applications

#### Start the API (`CookSpaceApi`)

Run the NestJS GraphQL API server:

```sh
npx nx serve CookSpaceApi
```

#### Start the Frontend (`CookSpace`)

Run the React development server:

```sh
npx nx serve CookSpace
```

### Building for Production

#### API:

```sh
npx nx build CookSpaceApi
```

#### Frontend:

```sh
npx nx build CookSpace
```

### Exploring the Project Graph

Visualize the dependency graph of your workspace:

```sh
npx nx graph
```

---

Learn more about Nx plugins [here](https://nx.dev/concepts/nx-plugins).

## Project Structure

- **`CookSpace`**: React app for the frontend.
- **`CookSpaceApi`**: NestJS GraphQL API for the backend.
- **Shared Libraries**: Place reusable components or utilities here for better code reuse and maintenance.

---
