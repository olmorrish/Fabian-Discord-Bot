export const isExec = (member) => {
  return member.roles.cache.has(process.env.EXECROLEID);
};

export const isJrExec = (member) => {
  return member.roles.cache.has(process.env.JREXECROLEID);
};

export const isAnyExec = (member) => {
  return isJrExec(member) || isExec(member);
};
