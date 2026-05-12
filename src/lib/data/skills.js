/**
 * Single source of truth for skill clusters.
 * SkillsRadar averages each cluster's `items.level` to produce its axis value.
 * Keep this in sync with what's claimed in DomainArchitectureSection skill cards.
 */
export const skillClusters = [
  {
    axis: 'CLOUD',
    color: '#00ff88',
    items: [
      { name: 'AWS (Solutions Architect SAA-C03)', level: 90 },
      { name: 'HPE Networking',                    level: 88 },
      { name: 'Kubernetes (+ HPE Ezmeral)',         level: 82 },
      { name: 'Solution Architecture & Design',     level: 85 },
      { name: 'Docker & Containers',                level: 84 },
      { name: 'Microsoft Azure (AZ-900)',           level: 74 },
      { name: 'Amazon S3',                          level: 84 }
    ]
  },
  {
    axis: 'NETWORK',
    color: '#00ff88',
    items: [
      { name: 'Computer Networking (CCNA)',         level: 92 },
      { name: 'WiFi / Wireless',                    level: 84 },
      { name: 'Cybersecurity (Cisco)',              level: 80 },
      { name: 'Ethical Hacking (Cisco)',            level: 78 },
      { name: 'AI for Networking (Cisco)',          level: 78 },
      { name: 'Network Devices & Configuration',    level: 84 },
      { name: 'Packet Analysis',                    level: 80 }
    ]
  },
  {
    axis: 'LANG',
    color: '#00d4ff',
    items: [
      { name: 'Go (Golang)',                        level: 90 },
      { name: 'Python',                             level: 90 },
      { name: 'JavaScript / TypeScript',            level: 88 },
      { name: 'SQL / PL-SQL',                       level: 86 },
      { name: 'Java (Concurrent + Parallel)',       level: 80 },
      { name: 'Dart / Flutter',                     level: 64 }
    ]
  },
  {
    axis: 'AI · FS',
    color: '#a855f7',
    items: [
      { name: 'LangChain / LangGraph / Agents',     level: 86 },
      { name: 'RAG · Vector Search',                level: 84 },
      { name: 'Quarkus · FastAPI · React',          level: 88 },
      { name: 'MCP (Model Context Protocol)',       level: 80 },
      { name: 'MongoDB · ArangoDB · PostgreSQL',    level: 82 },
      { name: 'Kafka · Temporal · Redis',           level: 82 },
      { name: 'GraphQL · Apollo',                   level: 84 }
    ]
  }
];

/**
 * Derived axis values for the cluster-coverage radar.
 * Each value is the integer average of its cluster's item levels.
 */
export const radarAxes = skillClusters.map(c => ({
  label: c.axis,
  value: Math.round(c.items.reduce((sum, i) => sum + i.level, 0) / c.items.length),
  color: c.color
}));
