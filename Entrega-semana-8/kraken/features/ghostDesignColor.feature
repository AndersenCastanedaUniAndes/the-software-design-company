@5.69.0
Feature: ghost-Design&Branding color

@user1 @web
Scenario Outline: Como usuario administrador quiero personalizar el diseño de mi applicacion
  Given I navigate to page "<BASEURL>"
  And I wait for 3 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 5 seconds
  And I navigate to "Settings" with specific selector "a[href='#/settings/']"
  And I wait for 2 seconds
  And I navigate to "Design & Branding" with specific selector "button[name='design']"
  And I wait for 2 seconds
  And I navigate to "Customize the design" with specific selector "#admin-x-settings-content > div.relative.flex-auto.pt-\[10vmin\].tablet\:ml-\[300px\].tablet\:pt-\[94px\] > div > div:nth-child(2) > div > div:nth-child(1) > div.flex.items-start.justify-between.gap-4 > div.-mt-0\.5 > button"
  And I wait for 2 seconds
  And I navigate to "Hex Color" with specific selector "#modal-backdrop > section > div > div > div.relative.flex.h-full.w-full.flex-col.border-l.border-grey-100.dark\:border-grey-900.md\:w-auto.md\:basis-\[400px\] > div.absolute.inset-x-0.bottom-0.top-\[74px\].grow.false.flex.flex-col.justify-between.overflow-y-auto.undefined > div > div.p-7 > section > div.block > div > div > div > div.mt-2.flex-col > div.mt-2 > div.mt-3.flex.gap-2 > div > input" to set Value "<COLOR>"
  And I wait for 2 seconds
  And I navigate to "Save" with specific selector "button.bg-black.text-white"
  And I wait for 2 seconds
  And I navigate to "Close" with specific selector "#modal-backdrop > section > div > div > div.relative.flex.h-full.w-full.flex-col.border-l.border-grey-100.dark\:border-grey-900.md\:w-auto.md\:basis-\[400px\] > div.flex.max-h-\[74px\].items-center.justify-between.gap-3.px-7.py-5 > div > button.cursor-pointer.text-black.dark\:text-white.dark\:hover\:bg-grey-900.hover\:bg-grey-200.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-sm.text-sm.transition.font-semibold.h-\[34px\].px-4"
  And I wait for 2 seconds
  And I navigate to "Done" with specific selector "#admin-x-root > div.relative.z-20.px-6.py-4.tablet\:fixed > button"
  And I wait for 2 seconds
  And I navigate to "Profile" with specific selector "div.gh-user-avatar.relative"
  And I wait for 2 seconds
  And I navigate to "Sign out" with specific selector "a[href='#/signout/']"
  And I wait for 2 seconds
  Then I validate that the signin button has color "<COLOR>"
  And I wait for 2 seconds

Examples:
  | COLOR   | COMMENT     |
  | ff6a00  | Brand Color |
  | 2d94ff  | Brand Color |
  | 07ba2a  | Brand Color |
  | d76ce1  | Brand Color |