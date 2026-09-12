# Asai Neko

## Personal Information

- Name: Asai Neko
- Year of Birth: 2006
- Base: Shanghai, China
- Website: [sne.moe](https://sne.moe)
- Forge: [forge.asnk.io/sugar](https://forge.asnk.io/sugar)
- GitHub: [github.com/SugarNekoE](https://github.com/SugarNekoE)

Systems-oriented software and infrastructure engineer focused on Linux, networking, cloud-native infrastructure, backend engineering, and applied AI.

I enjoy designing reliable systems, building production infrastructure, and exploring emerging technologies and engineering practices.

Member of NixCN, the Chinese Nix/NixOS community, and organizer of the NixCN Conf open-source conference.

---

## Project Experience

### NixCN & NixCN Conf

- Participate in the development and maintenance of NixCN community infrastructure and open-source projects.
- Participate in organizing NixCN Conf, focused on the Nix/NixOS ecosystem, reproducible systems, and related open-source technologies.
- Developed the open-source conference management system used by NixCN for conference operations, attendee management, scheduling, and on-site workflows.
- The system uses technologies including Go, SvelteKit, PostgreSQL, Redis, OpenTelemetry, OpenAPI, and Nix/devenv.

Organization: [forge.asnk.io/nixcn](https://forge.asnk.io/nixcn)

### Flake — Declarative NixOS & Home Manager Configuration

A personal Nix flake for managing NixOS systems and Home Manager environments.

- Designed a custom aspect-oriented layout and an embedded domain-specific language (DSL) in Nix to declare and compose NixOS and Home Manager configurations, with automatic module discovery and host assembly.
- Organize applications, services, desktop environments, and hardware settings into shared modules and host-specific configurations.

Repository: [forge.asnk.io/sugar/flake](https://forge.asnk.io/sugar/flake)

### Asai Blog — Static Blog & Publishing System

A static blog built with a functional programming stack: Haskell (Hakyll and Pandoc) for site generation and Elm for the interactive frontend, with content authored in Obsidian.

- Compile published Markdown notes into static pages, resolving wiki links and attachments during the build.
- Implement search, category and tag filtering, and keyboard navigation through an Elm interface.

Repository: [forge.asnk.io/sugar/asai-blog](https://forge.asnk.io/sugar/asai-blog)

### ACS K8s — Serverless CI Runners

A Forgejo Actions runner system built on Alibaba Cloud ACS serverless Kubernetes, designed to reduce idle runner capacity and control costs compared with maintaining a dedicated server or an always-on cluster.

- Use KEDA to scale ephemeral runners from the job queue, execute one job per runner, and scale runner pools to zero when idle.
- Built a Go CLI for runner configuration, deployment, and diagnostics.
- Use Buildah for container image builds instead of privileged Docker-in-Docker.

Repository: [forge.asnk.io/sugar/acs-k8s](https://forge.asnk.io/sugar/acs-k8s)

### Git Indexing System — Large Repository Processing

Built a highly concurrent Git indexing system optimized for very large repositories such as the Linux kernel.

- Handle workloads loading 1.5 million commits at once, with concurrent Git log queries and object retrieval.
- Tuned kernel parameters for high-concurrency indexing workloads.
- Optimized NFSv4 protocol usage for concurrent repository access.
- Optimized Git core operations for log queries and object retrieval in large repositories.
- Achieved measured I/O throughput of 3,200 IOPS.

### Ayame Cluster — Production Kubernetes Platform

Designed, built, and maintain a production Kubernetes platform consisting of 3 control-plane nodes and 5 worker nodes, with infrastructure provisioning, cluster configuration, application deployment, and continuous delivery managed as code.

- Designed and provisioned the underlying infrastructure using Terraform.
- Built a declarative GitOps workflow around Argo CD for cluster and application lifecycle management.
- Integrated TeamCity to provide automated CI/CD workflows from source code to production deployment.
- Organized cluster configuration into infrastructure, platform, and application layers.
- Operate production workloads including source code hosting, container registries, communication services, databases, and web applications.
- Deployed and maintain infrastructure including Istio, cert-manager, Sealed Secrets, CloudNativePG, and CSI-backed persistent storage.
- Designed production networking, TLS/PKI, service networking, persistent storage, secrets management, and database infrastructure.
- Maintain the platform through Infrastructure as Code and declarative Kubernetes configuration.

Repository: [forge.asnk.io/sugar/ayame-cluster](https://forge.asnk.io/sugar/ayame-cluster)

### Windi — Email & Parcel Management System

A full-stack email and parcel management application currently under active development.

- Integrates with multiple third-party APIs to provide accurate parcel and shipment tracking.
- Provides a unified interface for managing shipment information, documents, and related records.
- Supports one-stop management and printing of shipping documents, labels, and covers.
- Built as a full-stack application using Svelte, SvelteKit, and TypeScript.

Repository: [forge.asnk.io/sugar/windi](https://forge.asnk.io/sugar/windi)

### NyaBot — Go Chatbot Framework

Contributed 19 merged pull requests to NyaBot, an open-source chatbot framework written in Go.

- Implemented go-cqhttp HTTP and forward/reverse WebSocket integration, event dispatch, and typed action APIs.
- Built Go/Lua extension mechanisms and improved configuration, data persistence, and multi-architecture container release automation.

Repository: [github.com/SNENET/NyaBot](https://github.com/SNENET/NyaBot)

Documentation: [github.com/SNENET/NyaBot-Docs](https://github.com/SNENET/NyaBot-Docs)

---

## Work Experience

### Infrastructure & AI Engineer — Education

2026 – Present

Working in the education sector with a focus on production infrastructure, application operations, and applied large language model research.

- Participate in the design and development of a production-grade application operations and management platform.
- Build and maintain network and application infrastructure supporting production services.
- Work on deployment automation, application lifecycle management, service networking, and infrastructure reliability.
- Research practical applications of frontier large language models in education.
- Explore AI-assisted workflows across the complete product development lifecycle, including product planning, design, engineering, testing, and iteration.
- Research the use of LLMs and agentic tools to improve collaboration and productivity across product, design, and engineering teams.

### Chief Technology Officer (CTO) — Medical Education Technology Organization

Apr 2023 – Apr 2026 · 3 years

Led technical architecture and product development for AI-enabled medical education and training systems, spanning software, hardware, sensor data acquisition, analytics, and human-computer interaction.

- Joined the organization when the team consisted of approximately 5 people, and played a major role in building and scaling the team to approximately 50 people.
- Helped establish the team's technical foundations, engineering practices, architectural direction, and cross-functional collaboration model.
- Practiced and promoted Agile development and engineering management, continuously improving iteration, collaboration, delivery, and development processes.
- Designed the overall system architecture and participated directly in the design of the product's core technical framework.
- Defined technical strategy and guided product direction, architecture evolution, and engineering priorities.
- Led the design and development of integrated hardware-software systems for AI-assisted medical education and training.
- Designed end-to-end pipelines covering sensor data acquisition, signal processing, data analysis, and interactive visualization.
- Participated in the design of human-computer interaction systems that transformed real-time sensor and analytical data into actionable training feedback.
- Researched continuous and dynamic performance indicators across the full medical education and training workflow.
- Designed methodologies for evaluating and tracking training performance through multidimensional, time-series, and behavioral metrics.
- Applied AI and data-driven techniques to training analysis, assessment, and guidance.
- Worked across product, software, hardware, data, AI, and research disciplines.
- Contributed to the formulation of relevant technical and industry standards for dynamic indicator monitoring and evaluation in medical education.
- Provided technical leadership and architectural guidance while remaining directly involved in core system design and implementation.

### IDC Platform Engineer

2022

Participated in the construction, operation, and management of a production IDC platform.

- Participated in core platform infrastructure construction and operations.
- Worked on infrastructure deployment, platform management, networking, service operations, and maintenance.
- Supported the reliability and day-to-day operation of production infrastructure.

---

## Technical Stack

- Programming Languages: Go, C, C++, Rust, TypeScript, Python
- Systems: Linux, Nix / NixOS, RHEL
- Cloud Native & Infrastructure: Kubernetes, Terraform, Argo CD, GitOps, CI/CD, Infrastructure as Code
- Networking: BGP, DNS, AS200720 holder
- AI & HCI: LLM application and development, Agent workflows, Human-Computer Interaction

---

## Interests & Hobbies

- Open-source software and communities
- Linux ecosystem
- Nix / NixOS ecosystem
- Computer networking
- Embedded engineering
- Cats
- Animes

I enjoy my work and continuously explore emerging technologies, tools, and engineering practices.

~~VRChat 2000+ hours player~~
