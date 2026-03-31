// 酒保问候模块

const changeGreeting = () => {
  if (!elements.greetingText) return

  elements.greetingText.classList.add('fade-out')

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * GREETINGS.length)
    elements.greetingText.textContent = GREETINGS[randomIndex]
    elements.greetingText.classList.remove('fade-out')
  }, 300)
}
