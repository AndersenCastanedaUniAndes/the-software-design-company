@5.69.0
Feature: Site-Background color

@user1 @web
Scenario Outline: Como usuario administrador quiero crear elementos en la barra de navegación
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
  And I navigate to "Navigation" with specific selector "#admin-x-settings-content > div.relative.flex-auto.pt-\[10vmin\].tablet\:ml-\[300px\].tablet\:pt-\[94px\] > div > div:nth-child(2) > div > div:nth-child(2) > div.flex.items-start.justify-between.gap-4 > div.-mt-0\.5 > button"
  And I wait for 2 seconds
  And I navigate to "New Item Label" with specific selector "input[placeholder='New item label']" to set Value "<NAME>"
  And I wait for 2 seconds
  And I navigate to "OK" with specific selector "#modal-backdrop > section > div.w-100.sticky.bottom-\[-24px\].z-\[297\].m-0.box-border.p-0 > div.sticky.z-\[299\].mb-\[-24px\].flex.items-center.justify-between.h-\[96px\].bg-white.dark\:bg-black > div > div.flex.gap-3 > div > button.cursor-pointer.bg-black.text-white.dark\:bg-white.dark\:text-black.hover\:bg-grey-900.inline-flex.items-center.justify-center.whitespace-nowrap.rounded-sm.text-sm.transition.font-bold.h-\[34px\].px-4.min-w-\[80px\]"
  And I wait for 2 seconds
  And I navigate to page "<SITE_BASEURL>"
  And I wait for 2 seconds
  Then I validate that the site navbar has "<NAME>"
  And I wait for 2 seconds

Examples:
  | NAME          | COMMENT      |
  | Deportes      | Element Name |
  | Intereses     | Element Name |
  | Habilidades   | Element Name |
  | Casualidades  | Element Name |
