function parseUsername(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || null;
  } catch {
    return null;
  }
}

export async function getGithubStatus(githubUrl) {
  const username = parseUsername(githubUrl);
  if (!username) {
    return null;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "monarch-portfolio-system"
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return { username, unavailable: true };
    }

    const data = await response.json();
    return {
      username,
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      publicGists: data.public_gists
    };
  } catch {
    return { username, unavailable: true };
  }
}

export async function getLeetCodeStatus(leetcodeUrl) {
  const username = parseUsername(leetcodeUrl);
  if (!username) {
    return null;
  }

  const query = `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
          reputation
          starRating
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      return { username, unavailable: true };
    }

    const payload = await response.json();
    const matchedUser = payload?.data?.matchedUser;

    if (!matchedUser) {
      return { username, unavailable: true };
    }

    const totals = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const allSolved = totals.find((entry) => entry.difficulty === "All")?.count ?? 0;
    const easySolved = totals.find((entry) => entry.difficulty === "Easy")?.count ?? 0;
    const mediumSolved = totals.find((entry) => entry.difficulty === "Medium")?.count ?? 0;
    const hardSolved = totals.find((entry) => entry.difficulty === "Hard")?.count ?? 0;

    return {
      username,
      ranking: matchedUser.profile?.ranking ?? null,
      reputation: matchedUser.profile?.reputation ?? null,
      starRating: matchedUser.profile?.starRating ?? null,
      solved: {
        all: allSolved,
        easy: easySolved,
        medium: mediumSolved,
        hard: hardSolved
      }
    };
  } catch {
    return { username, unavailable: true };
  }
}
