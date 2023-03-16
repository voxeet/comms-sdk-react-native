package io.dolby.sdk.comms.reactnative.mapper

import android.content.res.Resources.NotFoundException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.voxeet.sdk.push.center.subscription.register.BaseSubscription
import com.voxeet.sdk.push.center.subscription.register.SubscribeActiveParticipants
import com.voxeet.sdk.push.center.subscription.register.SubscribeConferenceCreated
import com.voxeet.sdk.push.center.subscription.register.SubscribeConferenceEnded
import com.voxeet.sdk.push.center.subscription.register.SubscribeInvitation
import com.voxeet.sdk.push.center.subscription.register.SubscribeParticipantJoined
import com.voxeet.sdk.push.center.subscription.register.SubscribeParticipantLeft

object SubscribeMapper {
  fun fromMap(map: ReadableMap): BaseSubscription {
    val conferenceAlias = map.getString("conferenceAlias") ?: throw NotFoundException("conferenceAlias not found")
    return when(map.getString("type")) {
      SUBSCRIPTION_TYPE_CONFERENCE_CREATED -> SubscribeConferenceCreated(conferenceAlias)
      SUBSCRIPTION_TYPE_CONFERENCE_ENDED -> SubscribeConferenceEnded(conferenceAlias)
      SUBSCRIPTION_TYPE_ACTIVE_PARTICIPANTS -> SubscribeActiveParticipants(conferenceAlias)
      SUBSCRIPTION_TYPE_PARTICIPANT_JOINED -> SubscribeParticipantJoined(conferenceAlias)
      SUBSCRIPTION_TYPE_PARTICIPANT_LEFT -> SubscribeParticipantLeft(conferenceAlias)
      SUBSCRIPTION_TYPE_INVITATION_RECEIVED -> SubscribeInvitation()
      else -> throw java.lang.Exception("Incorrect type of subscription")
    }
  }

  fun fromRNSubscribeList(subscriptionList: ReadableArray): List<BaseSubscription> =
    (0 until subscriptionList.size())
      .map(subscriptionList::getMap)
      .mapNotNull { fromMap(it) }


  private const val SUBSCRIPTION_TYPE_CONFERENCE_CREATED = "SUBSCRIPTION_TYPE_CONFERENCE_CREATED"
  private const val SUBSCRIPTION_TYPE_CONFERENCE_ENDED = "SUBSCRIPTION_TYPE_CONFERENCE_ENDED"
  private const val SUBSCRIPTION_TYPE_ACTIVE_PARTICIPANTS = "SUBSCRIPTION_TYPE_ACTIVE_PARTICIPANTS"
  private const val SUBSCRIPTION_TYPE_PARTICIPANT_JOINED = "SUBSCRIPTION_TYPE_PARTICIPANT_JOINED"
  private const val SUBSCRIPTION_TYPE_PARTICIPANT_LEFT = "SUBSCRIPTION_TYPE_PARTICIPANT_LEFT"
  private const val SUBSCRIPTION_TYPE_INVITATION_RECEIVED = "SUBSCRIPTION_TYPE_INVITATION_RECEIVED"

}
