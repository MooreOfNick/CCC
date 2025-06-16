'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createGroupCampaign(formData: FormData) {
  const groupName = formData.get('groupName') as string
  const groupEmail = formData.get('groupEmail') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const beneficiary = formData.get('beneficiary') as string
  const beneficiaryUrl = formData.get('beneficiaryUrl') as string
  const goal = parseFloat(formData.get('goal') as string)

  console.log('Creating campaign with data:', {
    groupName,
    groupEmail,
    title,
    description,
    beneficiary,
    beneficiaryUrl,
    goal
  })

  try {
    // Create or update the group
    const group = await prisma.group.upsert({
      where: { email: groupEmail },
      update: { name: groupName },
      create: {
        name: groupName,
        email: groupEmail,
      },
    })

    console.log('Group created/updated:', group)

    // Create the campaign
    try {
      const campaign = await prisma.campaign.create({
        data: {
          title,
          description,
          beneficiary,
          beneficiaryUrl: beneficiaryUrl || null,
          goal,
          groupId: group.id,
          yellowCardRate: 10, // Default rate for yellow cards
          redCardRate: 50,    // Default rate for red cards
        },
      })

      console.log('Campaign created:', campaign)
      revalidatePath('/')
      return { success: true, campaign }
    } catch (campaignError) {
      console.error('Error creating campaign:', campaignError)
      // If campaign creation fails, we should probably delete the group we just created
      await prisma.group.delete({
        where: { id: group.id }
      })
      throw campaignError // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('Error in createGroupCampaign:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create campaign'
    }
  }
}

export async function createPledge(formData: FormData, campaignId: string) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const yellowCardRate = parseFloat(formData.get('yellowCardRate') as string)
  const redCardRate = parseFloat(formData.get('redCardRate') as string)
  const isAnonymous = formData.get('isAnonymous') === 'on'

  try {
    const pledge = await prisma.pledge.create({
      data: {
        name: isAnonymous ? 'Anonymous' : name,
        email,
        phone: phone || null,
        yellowCardRate,
        redCardRate,
        isAnonymous,
        campaignId,
      },
    })

    revalidatePath(`/campaigns/${campaignId}`)
    return { success: true, pledge }
  } catch (error) {
    console.error('Error creating pledge:', error)
    return { success: false, error: 'Failed to create pledge' }
  }
} 