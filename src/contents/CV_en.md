# Asai Neko

## Personal Information

- Name: Asai Neko
- Year of Birth: 2006
- Base: Shanghai, China
- Website: [sne.moe](https://sne.moe)
- Forge: [forge.asnk.io/sugar](https://forge.asnk.io/sugar)
- GitHub: [github.com/SugarNekoE](https://github.com/SugarNekoE)

Systems-oriented software and infrastructure engineer focused on Linux, networking, cloud-native infrastructure, backend engineering, and applied AI. My work covers Linux kernel development, cloud platforms, and private LLM inference platforms for production teams.

I enjoy designing reliable systems, building production infrastructure, and exploring emerging technologies and engineering practices.

Linux kernel contributor, member of NixCN, the Chinese Nix/NixOS community, and organizer of the NixCN Conf open-source conference.

---

## Project Experience

### DeepInfer SM80
#### SM80 Inference Adaptation (In Development)

Work in progress to adapt DeepInfer's optimized inference stack to NVIDIA SM80 GPUs, with a primary focus on the Decode path.

- Adapt the related GEMM, expert-parallel (EP), MLA, Select, and JIT components for SM80.
- Migrate DeepInfer's primary Decode path to Ampere while preserving the optimized serving runtime.
- Extend DeepSeek-V4.1-Flash inference from the upstream SM100 and Ascend targets to SM80 deployments.

### Linux Kernel
#### Hardware and Driver Development

Contribute to Linux kernel modules with a focus on hardware monitoring, audio, and device drivers.

- Work on hwmon drivers and hardware-monitoring interfaces.
- Develop and fix ALSA audio drivers, including USB audio devices.
- Contribute device-driver changes across platform and hardware-specific subsystems.

Repository: [forge.asnk.io/sugar/linux](https://forge.asnk.io/sugar/linux)

### NixCN & NixCN Conf
#### Open-Source Contributions and Community Conference Organization

- Participate in the development and maintenance of NixCN community infrastructure and open-source projects.
- Participate in organizing NixCN Conf, focused on the Nix/NixOS ecosystem, reproducible systems, and related open-source technologies.
- Developed the open-source conference management system used by NixCN for conference operations, attendee management, scheduling, and on-site workflows.
- The system uses technologies including Go, SvelteKit, PostgreSQL, Redis, OpenTelemetry, OpenAPI, and Nix/devenv.

Organization: [forge.asnk.io/nixcn](https://forge.asnk.io/nixcn)

### Flake
#### Declarative NixOS & Home Manager Configuration

A personal Nix flake for managing NixOS systems and Home Manager environments.

- Designed a custom aspect-oriented layout and an embedded domain-specific language (DSL) in Nix to declare and compose NixOS and Home Manager configurations, with automatic module discovery and host assembly.
- Organize applications, services, desktop environments, and hardware settings into shared modules and host-specific configurations.

Repository: [forge.asnk.io/sugar/flake](https://forge.asnk.io/sugar/flake)

### Asai Blog
#### Static Blog & Publishing System

A static blog built with a functional programming stack: Haskell (Hakyll and Pandoc) for site generation and Elm for the interactive frontend, with content authored in Obsidian.

- Compile published Markdown notes into static pages, resolving wiki links and attachments during the build.
- Implement search, category and tag filtering, and keyboard navigation through an Elm interface.

Repository: [forge.asnk.io/sugar/asai-blog](https://forge.asnk.io/sugar/asai-blog)

### ACS K8s
#### Serverless CI Runners

A Forgejo Actions runner system built on Alibaba Cloud ACS serverless Kubernetes, designed to reduce idle runner capacity and control costs compared with maintaining a dedicated server or an always-on cluster.

- Use KEDA to scale ephemeral runners from the job queue, execute one job per runner, and scale runner pools to zero when idle.
- Built a Go CLI for runner configuration, deployment, and diagnostics.
- Use Buildah for container image builds instead of privileged Docker-in-Docker.

Repository: [forge.asnk.io/sugar/acs-k8s](https://forge.asnk.io/sugar/acs-k8s)

### Git Indexing System
#### Large Repository Processing

Built a highly concurrent Git indexing system optimized for very large repositories such as the Linux kernel.

- Handle workloads loading 1.5 million commits at once, with concurrent Git log queries and object retrieval.
- Tuned kernel parameters for high-concurrency indexing workloads.
- Optimized NFSv4 protocol usage for concurrent repository access.
- Optimized Git core operations for log queries and object retrieval in large repositories.
- Achieved measured I/O throughput of 3,200 IOPS.

Website: [forge.asnk.io](https://forge.asnk.io)

### Ayame Cluster
#### Production Kubernetes Platform

Designed, built, and maintain a production Kubernetes platform consisting of 3 control-plane nodes and 5 worker nodes, with infrastructure provisioning, cluster configuration, application deployment, and continuous delivery managed as code.

- Designed and provisioned the underlying infrastructure using Terraform.
- Built a declarative GitOps workflow around Argo CD for cluster and application lifecycle management.
- Integrated TeamCity to provide automated CI/CD workflows from source code to production deployment.
- Organized cluster configuration into infrastructure, platform, and application layers.
- Operate production workloads including source code hosting, container registries, communication services, databases, and web applications.
- Deployed and maintain infrastructure including Istio, cert-manager, Sealed Secrets, CloudNativePG, and CSI-backed persistent storage.
- Designed production networking, TLS/PKI, service networking, persistent storage, secrets management, and database infrastructure.
- Maintain the platform through IaC and declarative Kubernetes configuration.

Repository: [forge.asnk.io/sugar/ayame-cluster](https://forge.asnk.io/sugar/ayame-cluster)

---

## Work Experience

### Full-Stack and AI Infrastructure Engineer
#### Education

2026 – Present

Working in the education sector across full-stack product engineering, production infrastructure, application operations, and applied large language model research.

- Lead the design and development of a production-grade project operations and management platform.
- Design and develop a Haskell-based LaTeX paper-generation system with real-time agent input and output.
- Lead the design and development of a higher mathematics graph generation model backend based on Torch and DeepMind models.
- Build an enterprise Zero Trust network platform based on NetBird, replacing the existing paid Tailscale solution, with fine-grained access control for network devices and services.
- Build and deploy a DeepSeek-V4.1-Flash model platform across multiple servers totaling 16 A800-80G GPUs, and optimize the SM80 vLLM compatibility runtime for private use across team workflows.
- Build and maintain network and application infrastructure supporting production services, including deployment automation, application lifecycle management, service networking, and infrastructure reliability.
- Explore AI-assisted workflows across the complete product development lifecycle, including product planning, design, engineering, testing, and iteration.
- Research the use of LLMs and agentic tools to improve collaboration and productivity across product, design, and engineering teams.

### Chief Technology Officer (CTO)
#### Medical Education Technology Organization

Apr 2023 – Apr 2026 · 3 years

Led technical architecture and product development for AI-enabled medical education and training systems spanning software, hardware, sensor data, multimodal models, and human-computer interaction.

- Joined the organization when the team consisted of approximately 5 people and helped scale it to approximately 50, establishing technical foundations, engineering practices, architecture direction, and cross-functional collaboration.
- Owned overall system architecture and directly contributed to core technical framework design; helped guide product direction and engineering priorities.
- Led R&D of high-precision medical operation recognition, combining multimodal models with human-computer interaction to design education workflows.
- Designed end-to-end pipelines covering sensor data acquisition, signal processing, data analysis, and interactive visualization.
- Contributed to the design of human-computer interaction systems that turn real-time sensor and analytical data into actionable training feedback.
- Researched continuous dynamic performance indicators and designed evaluation and tracking methods using multidimensional, time-series, and behavioral data.
- Applied AI and data-driven techniques to training analysis, assessment, and guidance, and contributed to technical and industry standards for dynamic indicator monitoring and evaluation.

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
- Cloud Native & Infrastructure: Kubernetes, Terraform, Argo CD, GitOps, CI/CD, IaC
- Cloud Platforms: Alibaba Cloud, GCP, Hetzner
- Networking: BGP, DNS, AS200720 holder
- AI & HCI: LLM application and development, Agent workflows, Human-Computer Interaction

---

## Interests & Hobbies

- Open-source software and communities
- Linux ecosystem
- Reproducible environments
- Computer networking
- Embedded engineering
- Cats
- Animes

I enjoy my work and continuously explore emerging technologies, tools, and engineering practices.
